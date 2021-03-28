import DatePickerNav from '@/components/DatePickerNav.vue'
import { mount } from '@vue/test-utils'

describe('DatePickerNav.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(DatePickerNav, {
      propsData: {
        prevEnable: true,
        nextEnable: true
      }
    })
  })

  test('if prevMonth is emitted onClick', () => {
    const prevButton = wrapper.find('[data-testid="prev-month-button"]')
    prevButton.trigger('click')
    const emittedObj = wrapper.emitted('prevMonth')
    expect(emittedObj).toHaveLength(1)
  })
  test('if nextMonth is emitted onClick', () => {
    const nextButton = wrapper.find('[data-testid="next-month-button"]')
    nextButton.trigger('click')
    const emittedObj = wrapper.emitted('nextMonth')
    expect(emittedObj).toHaveLength(1)
  })

  test('if prevMonth button is rendered', async () => {
    await wrapper.setProps({ prevEnable: false })
    const prevButton = wrapper.find('[data-testid="prev-month-wrapper"]')
    expect(prevButton.html()).toContain('<!---->')
  })

  test('if nextMonth button is rendered', async () => {
    await wrapper.setProps({ nextEnable: false })
    const nextButton = wrapper.find('[data-testid="next-month-wrapper"]')
    expect(nextButton.html()).toContain('<!---->')
  })
})
