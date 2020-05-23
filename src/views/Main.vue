<template>
  <div class="main-container">
    <h1>To Do List</h1>
    <section>
      <button @click="goToInput">Add</button>
      <ul class="card-container" v-for="list in result" :key="list.id">
        <li class="card" :class="{ color: list.done == 2 }">
          <h3>{{ list.title }}</h3>
          <div>{{ list.due }}</div>
          <div class="icon">
            <span @click="modifyList(list.id)">✏️</span>
            <span class="delete" @click="deleteList(list.id)">❌</span>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      visible: false,
      lists: [],
      list1: [],
      list2: [],
      list3: [],
      result: []
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const res = await axios.get("http://localhost:3000/todos");
        this.lists = res.data;
        await this.handleList();
      } catch (err) {
        console.log("err", err);
      }
    },
    handleList() {
      for (let i = 0; i < this.lists.length; i++) {
        if (this.lists[i].done == 2) {
          this.list1.push(this.lists[i]);
        } else if (this.lists[i].priority.length != 0) {
          this.list2.push(this.lists[i]);

          // 우선순위있는 리스트 모은 배열을 우선순위 별로 정렬
          this.list2.length > 1 &&
            this.list2.sort(function(a, b) {
              return a.priority - b.priority;
            });
        } else {
          this.list3.push(this.lists[i]);

          // 날짜 별로 정렬
          this.list3.length > 1 &&
            this.list3.sort(function(a, b) {
              return a.priority - b.priority;
            });
        }
      }
      this.result = this.list1.concat(this.list2, this.list3);
    },
    goToInput() {
      this.$router.push("/input");
    },
    async deleteList(id) {
      try {
        const res = await axios.delete(`http://localhost:3000/todos/${id}`);
        console.log(res);
        this.fetchData();
      } catch (err) {
        alert("삭제에 실패했습니다.");
        console.log("err", err);
      }
      window.location.reload();
    },
    modifyList(num) {
      this.$router.push({ name: "todoInput", params: { id: num } });
    }
  }
};
</script>

<style scoped lang="scss">
.main-container {
  width: 30%;
  margin: 50px auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-weight: bold;
  }

  section {
    width: 100%;
    margin: 100px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    button {
      width: 75px;
      height: 30px;
      font-size: 18px;
      cursor: pointer;
      position: absolute;
      top: -50px;
      right: 0px;
    }

    .card-container {
      width: 100%;

      .card {
        width: 100%;
        font-size: 18px;
        padding: 5px 10px;
        margin: 10px 0;
        border: 1px solid black;
        display: flex;
        justify-content: space-between;
        align-items: center;

        &.color {
          background: #fbf2e9;
        }

        h3 {
          width: 100px;
          font-size: 18px;
        }

        .icon {
          span {
            cursor: pointer;
          }

          .delete {
            margin-left: 15px;
          }
        }
      }
    }
  }
}
</style>
