#!/bin/bash

cd /mnt/d/'Cogito ergo sum'/'Express learning'

messages=(
  "Refactor docs for clarity"
  "Improve README with fresh ideas"
  "Automated update: polishing docs"
  "Tiny but mighty README change"
  "Keeping the repo active and fresh"
  "Injecting randomness into documentation"
  "Routine update with a twist"
  "Fresh commit to keep momentum"
  "README evolution continues"
  "Another step in the journey"
)

commit_msg=${messages[$RANDOM % ${#messages[@]}]}

update_number=$((RANDOM % 1000))
echo "Update number $update_number at $(date)" >> README.md

git add README.md
git commit -m "$commit_msg"
git push origin dev

