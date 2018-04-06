<template>
  <div class="row marketing">

    <site-header></site-header>

    <p> {{ api.title }} </p>
    <p> {{ api.state }} </p>

    <h1>{{ api.title }}</h1>

    <br><br><br><br><br><br><br>

    {{ simple }}

    <br><br><br><br><br><br><br>

    <h2>{{ themeColor }}</h2>

    <input type="radio" id="one" value="light" name="th" v-model="themeColor">
    <label for="one">light</label>
    <br>
    <input type="radio" id="two" value="dark" name="th" v-model="themeColor">
    <label for="two">dark</label>
    <br>

    <br><br><br><br><br><br><br>
    1111
    <ul>
      <li v-for="(item, key) in api.articles" :key="item.title">
        {{ key }} - {{ item.title }}
      </li>
    </ul>
    2222
    <br><br><br><br><br><br><br>

    <b-button class="sweet">Sweet !</b-button>

    <site-footer></site-footer>
  </div>
</template>

<script>
import PageHeader from './parts/sections/header'
import PageFooter from './parts/sections/footer'
export default {
  name: 'Home',
  components: {
    'site-header': PageHeader,
    'site-footer': PageFooter
  },
  data: () => ({
    simple: 'The Prodigy',
    posts: []
  }),
  metaInfo: {
    title: 'Home',
    meta: [
      { name: 'description', content: 'Nulla quis lorem ut libero malesuada feugiat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Cras ultricies ligula sed magna dictum porta.' }
    ]
  },
  computed: {
    themeColor: {
      get () {
        return this.$store.state.themeColor
      },
      set (value) {
        this.$store.commit('changeThemeColor', value)
      }
    },
    api () {
      return this.$store.state.api
    }
  },
  created () {
    // this.axios.get('https://newsapi.org/v1/articles?source=the-next-web&sortBy=latest&apiKey=a681891607f0409eaffd66910b313863').then((response) => {
    //   console.log(response.data.articles[0].author)
    //   this.simple = response.data.articles[0].author
    //   this.posts = response.data.articles
    // })
  },
  preFetch (store) {
    store.dispatch('REQUEST_API', {
      method: 'get',
      url: '_request.php',
      props: {
        source: 'the-next-web',
        sortBy: 'latest',
        apiKey: 'a681891607f0409eaffd66910b313863'
      }
    })
  },
  beforeMount () {
    this.$store.state.global = 555
    this.$store.dispatch('REQUEST_API', {
      method: 'get',
      url: '_request.php',
      props: {
        source: 'the-next-web',
        sortBy: 'latest',
        apiKey: 'a681891607f0409eaffd66910b313863'
      }
    })
  },
  mounted () {
    $('button.sweet').click(() => {
      window.swal({
        title: 'Yo!',
        text: 'Yeaaah!',
        type: 'success',
        confirmButtonText: 'Cool'
      })
    })
  }
}
</script>
