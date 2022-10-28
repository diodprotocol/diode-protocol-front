// https://stackoverflow.com/questions/55175445/cant-import-svg-into-next-js

const withReactSvg = require('next-react-svg');
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
