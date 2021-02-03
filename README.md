## Weather widget
A small widget for fetching and displaying basic weather information.

This project consists of a React SPA, which handles user interaction and displays weather information.
And a Node.js middleware API to introduce some server-side control to the available weather information, 
as well as to hide API keys.

#### Disabling JavaScript
When running this app in a browser which has JavaScript disabled, an empty placeholder UI is shown.
With the frontend being written in React, the entire render engine is disabled - causing no components to remain rendered.
Disabling JavaScript thus also disables all interactive functionality which the compnents offer, meaning
- No app controlled navigation (history is not manipulated)
- No url search parameter processing or updating 
- No network requests
