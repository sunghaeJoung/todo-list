<template>
  <div class="todo-container">
    <h1>To Do Input Page</h1>
    <section>
      <div class="content-container">
        <div class="content">
          <h3>Title</h3>
          <input type="text" v-model="title" placeholder=" 필수입력" />
        </div>
        <div class="content">
          <h3>Contents</h3>
          <input type="text" v-model="contents" placeholder=" 필수입력" />
        </div>
        <div class="content">
          <h3>Due</h3>
          <input
            type="text"
            v-model="due"
            placeholder=" 필수입력 (YYYY.MM.DD)"
          />
        </div>
        <div class="content">
          <h3>Priority</h3>
          <input type="text" v-model="priority" placeholder=" 선택사항" />
        </div>
        <div class="content">
          <h3>Done</h3>
          <input
            class="checkbox"
            type="checkbox"
            v-model="done"
            true-value="2"
            false-value="1"
          />
        </div>
      </div>
      <div class="button-container">
        <button @click="saveTodo">save</button>
        <button @click="deleteList">delete</button>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      title: "",
      contents: "",
      due: "",
      priority: "",
      done: "1",
      id: 0,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    saveTodo() {
      if (
        this.title.length == 0 ||
        this.contents.length == 0 ||
        this.due.length == 0
      ) {
        alert("필수 항목을 입력해주세요.");
      } else {
        this.fetchSave();
      }
    },
    async fetchSave() {
      try {
        if (this.id > 0) {
          const res = await axios.put(
            `http://localhost:3000/todos/${this.id}`,
            {
              title: this.title,
              contents: this.contents,
              due: this.due,
              priority: this.priority,
              done: this.done,
            }
          );
          console.log(res);
        } else {
          const res = await axios.post("http://localhost:3000/todos", {
            title: this.title,
            contents: this.contents,
            due: this.due,
            priority: this.priority,
            done: this.done,
          });
          console.log(res);
        }
        this.$router.push("/");
      } catch (err) {
        alert("저장에 실패했습니다.");
        console.log("err", err);
      }
    },
    async fetchData() {
      const queryId = this.$route.params.id;
      const res = await axios.get(`http://localhost:3000/todos/${queryId}`);
      this.title = res.data.title;
      this.contents = res.data.contents;
      this.due = res.data.due;
      this.priority = res.data.priority;
      this.done = res.data.done;
      this.id = res.data.id;
    },
    async deleteList() {
      try {
        const id = this.id;
        const res = await axios.delete(`http://localhost:3000/todos/${id}`);
        console.log(res);
        this.$router.push("/");
      } catch (err) {
        alert("삭제에 실패했습니다.");
        console.log("err", err);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.todo-container {
  width: 500px;
  height: auto;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-weight: bold;
  }

  section {
    width: 80%;
    margin-top: 50px;

    .content-container {
      .content {
        margin: 10px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;

        h3 {
          font-size: 20px;
          margin-right: 20px;
        }

        input {
          width: 200px;
          height: 35px;
          font-size: 18px;

          &.checkbox {
            width: 20px;
            height: 20px;
          }
        }

        input::placeholder {
          font-size: 15px;
        }
      }
    }

    .button-container {
      margin-top: 50px;
      display: flex;
      justify-content: center;

      button {
        width: 75px;
        height: 30px;
        font-size: 18px;
        margin: 0 10px;
        cursor: pointer;
      }
    }
  }
}
</style>
