#!/bin/sh
# Replace placeholder with actual backend URL at runtime
find /usr/share/nginx/html -type f -name "*.js" -exec \
  sed -i "s|__BACKEND_URL__|$VITE_BACKEND_URL|g" {} \;

exec "$@"
