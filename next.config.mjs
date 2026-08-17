/** @type {import('next').NextConfig} */

// When built inside GitHub Actions, automatically prefix all asset/link paths
// with "/<repo-name>" since project pages (username.github.io/repo-name) are
// served from a subpath, not the domain root. Building locally leaves both
// empty, which is correct for a custom domain or a username.github.io repo.
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
let basePath = '';
let assetPrefix = '';

if (isGithubActions && process.env.GITHUB_REPOSITORY) {
  const repo = process.env.GITHUB_REPOSITORY.replace(/.*\//, '');
  basePath = `/${repo}`;
  assetPrefix = `/${repo}/`;
}

const nextConfig = {
  output: 'export',
  basePath,
  assetPrefix,
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
