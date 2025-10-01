import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// POST /api/draw-boxes - Create new draw box on a page
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const drawBox = await prisma.drawBox.create({
      data: {
        page_id: body.page_id,
        x_position: body.x_position,
        y_position: body.y_position,
        width: body.width,
        height: body.height
      }
    })
    return NextResponse.json(drawBox)
  } catch (error) {
    console.error('Failed to create draw box:', error)
    return NextResponse.json({ error: 'Failed to create draw box' }, { status: 500 })
  }
}