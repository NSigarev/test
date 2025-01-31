import { defineStore } from "pinia";
import UserResults from "@/components/userResults.vue";
import { UserResult } from "@/types/user";
import { sleep } from "@/common/utils";

export const useUserStore = defineStore({
  id: "users",
  state: () => {
    return {
      users: [] as UserResult[],
      isLoading: false as boolean,
    };
  },
  actions: {
    async fetchUsers(filter?: string): Promise<UserResult[]> {
      while (this.isLoading) {
        await sleep(50);
      }
      if (this.users == undefined || this.users.length == 0) {
        this.isLoading = true;
        // const res = await fetch('https://jsonplaceholder.typicode.com/users', {body: filter})
        //   .then((response) => response.json())
        //   .then((json) => console.log(json));;
        const res = [
          {
            id: 0,
            fio: "Ervin Howell",
            mail: "Shanna@melissa.tv",
            phone: "010-692-6593 x09125",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            img: "https://littlejohnremodeling.com/wp-content/uploads/2023/01/human-human-avatar-male-icon-with-png-and-vector-format-for-free-19807.png",
          },
          {
            id: 1,
            fio: "Bret",
            mail: "Sincere@april.biz",
            phone: "010-692-6593 x09125",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            img: "none",
          },
        ];
        // if (res.status === 200)
        this.users = res;
        this.isLoading = false;
      }
      return this.users;
    },
  },
});
