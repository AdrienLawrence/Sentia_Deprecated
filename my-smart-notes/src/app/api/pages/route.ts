import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// GET /api/pages - List pages (for homepage recent notes)
export async function GET() {
  try {
    const pages = await prisma.page.findMany({
      take: 4,
      orderBy: { created_at: 'desc' },
      include: {
        notebook: true  // Include notebook info if needed
      }
    })
    return NextResponse.json(pages)
  } catch (error) {
    console.error('Failed to fetch pages:', error)
    return NextResponse.json({ error: 'Failed to fetch pages' }, { status: 500 })
  }
}

// POST /api/pages - Create new page
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const page = await prisma.page.create({
      data: {
        title: body.title || 'Untitled Page',
        content: body.content || { type: 'doc', content: [] },
        page_number: body.page_number || 1,
        user_id: 'test-user-1', // Temporary until auth
        notebook_id: body.notebook_id || null
      }
    })
    return NextResponse.json(page)
  } catch (error) {
    console.error('Failed to create page:', error)
    return NextResponse.json({ error: 'Failed to create page' }, { status: 500 })
  }
}