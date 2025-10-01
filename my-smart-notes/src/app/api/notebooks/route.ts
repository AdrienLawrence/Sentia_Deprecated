import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// GET /api/notebooks - List notebooks
export async function GET() {
  try {
    const notebooks = await prisma.notebook.findMany({
      take: 4,
      orderBy: { created_at: 'desc' },
      include: {
        pages: {
          take: 1,
          orderBy: { created_at: 'desc' }
        }
      }
    })
    return NextResponse.json(notebooks)
  } catch (error) {
    console.error('Failed to fetch notebooks:', error)
    return NextResponse.json({ error: 'Failed to fetch notebooks' }, { status: 500 })
  }
}

// POST /api/notebooks - Create new notebook
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const notebook = await prisma.notebook.create({
      data: {
        name: body.name || 'Untitled Notebook',
        style: body.style || 'blank',
        user_id: 'test-user-1' // Temporary until auth
      }
    })
    return NextResponse.json(notebook)
  } catch (error) {
    console.error('Failed to create notebook:', error)
    return NextResponse.json({ error: 'Failed to create notebook' }, { status: 500 })
  }
}