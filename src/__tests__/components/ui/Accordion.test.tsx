import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/Accordion'

describe('Accordion Component', () => {
  it('should render accordion items', () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    )
    
    expect(screen.getByText(/item 1/i)).toBeInTheDocument()
  })

  it('should toggle accordion content on click', async () => {
    const user = userEvent.setup()
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    )
    
    const trigger = screen.getByText(/item 1/i)
    const contentBefore = screen.queryByText(/content 1/i)
    // Content might not be in DOM initially or might be hidden
    if (contentBefore) {
      expect(contentBefore).not.toBeVisible()
    }
    
    await user.click(trigger)
    const contentAfter = screen.getByText(/content 1/i)
    expect(contentAfter).toBeInTheDocument()
    
    await user.click(trigger)
    const contentAfterClose = screen.queryByText(/content 1/i)
    // Content might still be in DOM but hidden
    if (contentAfterClose) {
      expect(contentAfterClose).not.toBeVisible()
    }
  })

  it('should render multiple accordion items', () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Item 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>
    )
    
    expect(screen.getByText(/item 1/i)).toBeInTheDocument()
    expect(screen.getByText(/item 2/i)).toBeInTheDocument()
  })
})

