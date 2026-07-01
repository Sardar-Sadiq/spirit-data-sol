import fs from 'fs';

function readGlbJson(filePath) {
    const buffer = fs.readFileSync(filePath);
    const magic = buffer.toString('utf8', 0, 4);
    if (magic !== 'glTF') throw new Error('Not a valid glTF/GLB file');
    const chunkLength = buffer.readUInt32LE(12);
    const jsonStr = buffer.toString('utf8', 20, 20 + chunkLength);
    return JSON.parse(jsonStr);
}

try {
    const gltf = readGlbJson('public/3dCardModal.glb');

    console.log('--- DETAILED MATERIALS ---');
    gltf.materials?.forEach((mat, i) => {
        console.log(`Material ${i}: "${mat.name}"`);
        console.log('  pbr:', JSON.stringify(mat.pbrMetallicRoughness, null, 2));
    });

    console.log('\n--- DETAILED SCENE NODES ---');
    gltf.nodes?.forEach((node, i) => {
        console.log(`Node ${i}: "${node.name}"`, {
            mesh: node.mesh,
            translation: node.translation,
            rotation: node.rotation,
            scale: node.scale
        });
    });

} catch (e) {
    console.error(e);
}
