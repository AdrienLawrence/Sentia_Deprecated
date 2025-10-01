import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// GET /api/draw-elements/[id] - Get single draw element
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    const drawElement = await prisma.drawElement.findUnique({
      where: { id }
    })

    if (!drawElement) {
      return NextResponse.json({ error: 'Draw element not found' }, { status: 404 })
    }

    return NextResponse.json(drawElement)
  } catch (error) {
    console.error('Failed to fetch draw element:', error)
    return NextResponse.json({ error: 'Failed to fetch draw element' }, { status: 500 })
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

// DELETE /api/draw-elements/[id] - Delete draw element
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    await prisma.drawElement.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Draw element deleted' })
  } catch (error) {
    console.error('Failed to delete draw element:', error)
    return NextResponse.json({ error: 'Failed to delete draw element' }, { status: 500 })
  }
}