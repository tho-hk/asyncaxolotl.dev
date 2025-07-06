
// a utility to read all markdown files from notes/published/

import { BlogPost } from "@/types";
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postDirectory = path.join(process.cwd(), 'notes/published')

// function to read all markdown
export function getAllPosts(): BlogPost[] {
    // get current filenames
    // let files = fs.readFileSync(postDirectory);

    console.log('🔍 Debugging getAllPosts():');
    console.log('- Posts Directory:', postDirectory);
    console.log('- Directory exists:', fs.existsSync(postDirectory));

    if (fs.existsSync(postDirectory)) {
        const files = fs.readdirSync(postDirectory);
        console.log('- All files:', files);

        const mFiles = files.filter(file => path.extname(file) === '.md');
        console.log('- Markdown files:', mFiles);
    }
    return [];
}

//function to return single 
export function getPostBySlug(slug: string): BlogPost

//function to return 
export function markdownToHtml(markdown: string): string