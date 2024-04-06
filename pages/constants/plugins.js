import { sciDemo } from '../plugins/sci-demo.js'
import { scieEDemo } from '../plugins/sci-e-demo.js'
import { tdpFinder } from '../plugins/tdp-finder.js'
import { timeSyncDemo } from '../plugins/time-sync-demo.js'



export const rows = [
  { "title": "Time Sync Demo", "content": timeSyncDemo },
  { "title": "Sci Demo", "content": sciDemo },
  {"title": "TDP Finder",  "content": tdpFinder},
  
  {"title": "E Net",  "content": scieEDemo}
];