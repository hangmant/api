#!/bin/sh

echo "\n--- Hangman API Bootstrap ---\n"

echo "* Intalling Global CLI..."
npm install -g @nestjs/cli

echo '* Installing packages...'
yarn

echo "\n* Bootstrap done! ✅"