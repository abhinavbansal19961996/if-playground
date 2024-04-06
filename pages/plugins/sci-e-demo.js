export const scieEDemo = `name: sci-e-demo
description:
tags:
initialize:
  plugins:
    e-net:
      method: ENet
      path: "@grnsft/if-plugins"
      global-config:
        energy-per-gb: 0.02
tree:
  children:
    child:
      pipeline:
        - e-net
      config:
        e-net:
      inputs:
        - timestamp: 2023-08-06T00:00
          duration: 3600
          network/data-in: 1
          network/data-out: 2
        - timestamp: 2023-08-06T01:00
          duration: 3600
          network/data-in: 3
          network/data-out: 4
        - timestamp: 2023-08-06T02:00
          duration: 3600
          network/data-in: 2
          network/data-out: 3`