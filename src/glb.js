// /api/glb/<piece>.glb?roll=<degrees>
// Returns the piece's 3D file turned by <roll> degrees (around the axis pointing out of the wall),
// so the phone's own AR viewer (Android Scene Viewer, iPhone Quick Look) shows it turned too.
// The rotation is baked in by wrapping the scene in one extra node; the 3D data itself is untouched.

export async function handleGlb(request, env) {
  const url = new URL(request.url);
  const m = url.pathname.match(/^\/api\/glb\/([a-z0-9-]+)\.glb$/);
  if (!m) return new Response('Not found', { status: 404 });

  const src = await env.ASSETS.fetch(new Request(new URL(`/art/3d/${m[1]}.glb`, url.origin)));
  if (!src.ok) return new Response('Not found', { status: 404 });

  let roll = Math.round(Number(url.searchParams.get('roll')) || 0) % 360;
  if (roll < 0) roll += 360;
  const glb = new Uint8Array(await src.arrayBuffer());
  const body = roll === 0 ? glb : rotateGlb(glb, roll);

  return new Response(body, {
    headers: {
      'content-type': 'model/gltf-binary',
      'cache-control': 'public, max-age=86400',
      'access-control-allow-origin': '*',
    },
  });
}

function rotateGlb(glb, deg) {
  const dv = new DataView(glb.buffer, glb.byteOffset, glb.byteLength);
  if (dv.getUint32(0, true) !== 0x46546c67) throw new Error('not a GLB');
  const jsonLen = dv.getUint32(12, true);
  if (dv.getUint32(16, true) !== 0x4e4f534a) throw new Error('first chunk is not JSON');
  const gltf = JSON.parse(new TextDecoder().decode(glb.subarray(20, 20 + jsonLen)));
  const rest = glb.subarray(20 + jsonLen); // binary chunk(s), copied as-is

  // positive roll = counter-clockwise as seen from the front, same as model-viewer's `orientation`
  const half = (deg * Math.PI) / 360;
  const sceneIdx = gltf.scene ?? 0;
  const scene = gltf.scenes[sceneIdx];
  gltf.nodes = gltf.nodes || [];
  gltf.nodes.push({ name: 'roll', rotation: [0, 0, Math.sin(half), Math.cos(half)], children: scene.nodes || [] });
  scene.nodes = [gltf.nodes.length - 1];

  let json = new TextEncoder().encode(JSON.stringify(gltf));
  const pad = (4 - (json.length % 4)) % 4;
  if (pad) { const p = new Uint8Array(json.length + pad); p.set(json); p.fill(0x20, json.length); json = p; }

  const out = new Uint8Array(12 + 8 + json.length + rest.length);
  const ov = new DataView(out.buffer);
  ov.setUint32(0, 0x46546c67, true); ov.setUint32(4, 2, true); ov.setUint32(8, out.length, true);
  ov.setUint32(12, json.length, true); ov.setUint32(16, 0x4e4f534a, true);
  out.set(json, 20); out.set(rest, 20 + json.length);
  return out;
}
