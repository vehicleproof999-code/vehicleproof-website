import { defineConfig } from 'sanity';
import { table } from '@sanity/table';
import { structureTool } from 'sanity/structure';
import { post } from './schemaTypes/post';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
if (!projectId || !/^[a-z0-9]+$/.test(projectId)) {
  throw new Error('Set SANITY_STUDIO_PROJECT_ID in studio/.env to your Sanity project ID. See BLOG.md.');
}

export default defineConfig({
  name: 'vehicleproof',
  title: 'VehicleProof Blog',
  projectId,
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [structureTool(), table()],
  schema: { types: [post] },
});
