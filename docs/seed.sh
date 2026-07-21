#!/bin/bash

# Seed Database Script for SNGDB
# Usage: bash seed.sh or ./seed.sh

set -e

echo "═════════════════════════════════════════════════════"
echo "🌱 SieuNhanGear Database Seeding"
echo "═════════════════════════════════════════════════════"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if MongoDB is running
echo "🔍 Checking if MongoDB is running..."
if ! mongosh --eval "db.adminCommand('ping')" &> /dev/null; then
    echo "⚠️  MongoDB doesn't seem to be running."
    echo "📌 Please start MongoDB first:"
    echo "   mongod"
    echo ""
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo ""
echo "✅ Prerequisites OK"
echo ""

# Check if demo_data.json exists
if [ ! -f "../frontend/demo_data.json" ]; then
    echo "❌ Error: demo_data.json not found at ../frontend/demo_data.json"
    exit 1
fi

echo "📁 Current directory: $(pwd)"
echo "📄 Using demo_data.json from: $(cd ../frontend && pwd)/demo_data.json"
echo ""

# Run the seed script
echo "🚀 Starting database seeding..."
echo ""

node seed.js

echo ""
echo "═════════════════════════════════════════════════════"
echo "✨ Seeding completed!"
echo "═════════════════════════════════════════════════════"
