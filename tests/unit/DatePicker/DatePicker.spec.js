import DatePicker from '@/components/DatePicker.vue'
import { mount, shallowMount } from '@vue/test-utils'
describe('DatePicker.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(DatePicker, {
      propsData: {
        calendarSetup: {
          firstMonth: '2020-06-01',
          lastMonth: '2021-12-01'
        }
      },
      data() {
        return {
          editMode: ''
        }
      }
    })
  })

  test('switch for checkin mode', () => {
    const checkInTab = wrapper.find('[data-testid="check-in"]')
    checkInTab.trigger('click')
    expect(wrapper.vm.$data.editMode).toBe('checkIn')
  })

  test('switch for checkout mode', () => {
    const checkOutTab = wrapper.find('[data-testid="check-out"]')
    checkOutTab.trigger('click')
    expect(wrapper.vm.$data.editMode).toBe('checkOut')
  })

  test('if click on checkinTab open calendar', async () => {
    const checkInTab = wrapper.find('[data-testid="check-in"]')
    const testPickerCalendar = wrapper.find(
      '[data-testid="date-picker-calendar"]'
    )
    checkInTab.trigger('click')
    await wrapper.vm.$nextTick(() => {
      expect(testPickerCalendar.attributes().style).toBe('')
    })
  })
  test('if click on checkOut open calendar', async () => {
    const checkOutTab = wrapper.find('[data-testid="check-in"]')
    const testPickerCalendar = wrapper.find(
      '[data-testid="date-picker-calendar"]'
    )
    checkOutTab.trigger('click')
    await wrapper.vm.$nextTick(() => {
      expect(testPickerCalendar.attributes().style).toBe('')
    })
  })
  test('content of checkintab - default value', () => {
    const checkInTab = wrapper.find('[data-testid="check-in"]')
    expect(checkInTab.text()).toBe('Check in')
  })
  test('content of checkOut - default value', () => {
    const checkInTab = wrapper.find('[data-testid="check-out"]')
    expect(checkInTab.text()).toBe('Check out')
  })
})

describe('DatePicker.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(DatePicker, {
      propsData: {
        dateFrom: new Date('2021-04-09'),
        dateTo: new Date('2021-04-11'),
        calendarSetup: {
          firstMonth: '2020-06-01',
          lastMonth: '2021-12-01'
        }
      }
    })
  })
  test('content of checkintab - init value', () => {
    const checkInTab = wrapper.find('[data-testid="check-in"]')
    expect(checkInTab.text()).toBe('09-04-2021')
  })
  test('content of checkOut - init value', () => {
    const checkInTab = wrapper.find('[data-testid="check-out"]')
    expect(checkInTab.text()).toBe('11-04-2021')
  })
})
