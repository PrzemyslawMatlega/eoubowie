<script>
import BookingForm from '../components/BookingForm'
import fakeData from '../data/data.json'
export default {
  name: 'Home',
  functional: true,
  render: function (createElement) {
    return createElement(BookingForm, { props: { ...fakeData } })
  }
}
</script>
