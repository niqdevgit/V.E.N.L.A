#!/bin/bash

# Step 1: Download the main HTML file
curl http://frontend/dist/index.html > /usr/src/app/dist/index.html

# Step 2: Extract the JavaScript file using regex
js_file=$(grep -oP 'src="[^"]+/index[^"]+\.js"' /usr/src/app/dist/index.html | sed -n 's/src="\([^"]\+\)"/\1/p')

# Remove the "/assets/" prefix from js_file
js_file=${js_file#/assets/}

# Step 3: Download the extracted JavaScript file
curl "http://frontend/dist/assets/$js_file" > /usr/src/app/dist/assets/"$js_file"

echo "Script completed successfully!"
