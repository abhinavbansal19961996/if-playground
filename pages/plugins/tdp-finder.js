export const tdpFinder = `name: tdp-finder
description: demo
tags:
initialize:
  plugins:
    tdp-finder: # a model that returns an embodied value given the sci embodied attribution equation.
      method: TdpFinder
      path: "@grnsft/if-plugins"
tree:
  children:
    child:
      pipeline:
        - tdp-finder
      config:
      inputs:
        - timestamp: 2023-07-06T00:00
          duration: 300
          physical-processor: AMD 3020e
        - timestamp: 2023-07-06T01:00
          duration: 300
          physical-processor: AMD 3020e
        - timestamp: 2023-07-06T04:00
          duration: 200
          physical-processor: AMD 3020e
        - timestamp: 2023-07-06T08:00
          duration: 300
          physical-processor: AMD 3020e
        - timestamp: 2023-07-06T09:00
          duration: 300
          physical-processor: AMD 3020e`