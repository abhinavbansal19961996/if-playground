export const sciDemo = `name: sci-demo
description: example invoking sci model
tags:
initialize:
  plugins:
    sci:
      kind: plugin
      method: Sci
      path: "@grnsft/if-plugins"
      # global-config:
      #   functional-unit-time: 1 minute
tree:
  children:
    child:
      pipeline:
        - sci
      config:
        sci:
          functional-unit-time: 1 sec
          functional-unit: requests # factor to convert per time to per f.unit
      inputs:
        - timestamp: 2023-07-06T00:00
          duration: 3600
          energy: 5
          carbon-operational: 5
          carbon-embodied: 0.02
          requests: 100`