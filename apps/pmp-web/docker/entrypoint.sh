#!/usr/bin/env bash

GITHUB_CLIENT_ID="${GITHUB_CLIENT_ID}"
BITBUCKET_CLIENT_ID="${BITBUCKET_CLIENT_ID}"
GITLAB_CLIENT_ID="${GITLAB_CLIENT_ID}"
GITLAB_REDIRECT_URI="${GITLAB_REDIRECT_URI}"
GOOGLE_ANALYTICS_ID="${GOOGLE_ANALYTICS_ID}"

for f in /usr/share/nginx/html/assets/env/*.sample; do
    cp -- "$f" "${f%.sample}"
    sed -i -- "s/{{githubClientId}}/${GITHUB_CLIENT_ID}/g" "${f%.sample}"
    sed -i -- "s/{{bitbucketClientId}}/${BITBUCKET_CLIENT_ID}/g" "${f%.sample}"
    sed -i -- "s/{{gitlabClientId}}/${GITLAB_CLIENT_ID}/g" "${f%.sample}"
    sed -i -- "s@{{gitlabRedirectUri}}@${GITLAB_REDIRECT_URI}@g" "${f%.sample}"
    sed -i -- "s/{{googleAnalyticsId}}/${GOOGLE_ANALYTICS_ID}/g" "${f%.sample}"
    echo "${f%.sample}"
done

exec "$@"
