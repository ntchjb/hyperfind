# hyperfind

Simple text searching plugin for hyper using xterm search addon.

# Contribution

1. Fork this repo and pull [Hyper repo](https://github.com/zeit/hyper) repo.
2. Pull the code from forked repo and make some changes.
3. Install dependency by running `npm install`
3. Test your code by running `npm run dev`. Then, run Hyper (See [PLUGIN](https://github.com/zeit/hyper/blob/canary/PLUGINS.md) to run Hyper along with this plugin). After finished testing, push your code to the forked repo.
4. Create a pull request!

# Notes

This plugin overwrite keymap `CommandOrControl+A` so it might not work when using with other plugins that also register this keymap.