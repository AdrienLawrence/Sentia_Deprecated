import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// POST /api/draw-elements - Add element to draw box
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const drawElement = await prisma.drawElement.create({
      data: {
        draw_box_id: body.draw_box_id,
        type: body.type,
        x: body.x,
        y: body.y,
        width: body.width,
        height: body.height,
        properties: body.properties || {}
      }
    })
    return NextResponse.json(drawElement)
  } catch (error) {
    console.error('Failed to create draw element:', error)
    return NextResponse.json({ error: 'Failed to create draw element' }, { status: 500 })
  }
}

// PATCH /api/draw-elements/[id] - Update draw element
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const drawElement = await prisma.drawElement.update({
      where: { id },
      data: {
        x: body.x,
        y: body.y,
        width: body.width,
        height: body.height,
        properties: body.properties
      }
    })

    return NextResponse.json(drawElement)
  } catch (error) {
    console.error('Failed to update draw element:', error)
    return NextResponse.json({ error: 'Failed to update draw element' }, { status: 500 })
  }
}