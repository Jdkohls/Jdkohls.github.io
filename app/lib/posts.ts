import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';


interface PostMetadata {
  date: string
  title: string
}

interface PostData {
  data: string
  metadata: PostMetadata
}

export function getSortedPostsData(type: string) {
    const postsDirectory = path.join(process.cwd(), "public/posts/",type);
    // Get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...(matterResult.data as {date: string, title: string}),
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}


export async function getPostData(
  type: string,
  param: string
): Promise<PostData> {
  const fileName = path.join(
    process.cwd(),
    'public',
    'posts',
    type,
    `${param}.md`
  )

  const fileContents = fs.readFileSync(fileName, 'utf8')

  const matterResult = matter(fileContents)

  return {
    data: matterResult.content, // raw markdown
    metadata: matterResult.data as PostMetadata,
  }
}