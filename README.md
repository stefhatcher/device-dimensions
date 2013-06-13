device-dimensions
=================

Heat map and grid views of common device dimensions, not resolutions. Mobile and tablet.

Middleman project for local development. Middleman brings it all together.

## [Middleman](https://github.com/middleman/middleman)

```shell
cd MY_PROJECT
gem install bundler       # May already be installed
bundle install --binstubs # Install Middleman and dependencies (Requires XCode Command-Line tool)
```

From within project directory:

```shell
bin/middleman server              # Start the preview server
bin/middleman build --clean       # Build project to build/
```

## Data

Data gathered from [http://screensiz.es/](http://screensiz.es/) and formatted into yaml.
```shell
data/mobile.yaml
data/tablet.yaml
```
