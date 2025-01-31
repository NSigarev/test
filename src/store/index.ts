import { defineStore } from "pinia";
import UserResults from "@/components/userResults.vue";
import { UserResult } from "@/types/user";
import { sleep } from "@/common/utils";
const img =
  "https://littlejohnremodeling.com/wp-content/uploads/2023/01/human-human-avatar-male-icon-with-png-and-vector-format-for-free-19807.png";
const text =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
export const useUserStore = defineStore({
  id: "users",
  state: () => {
    return {
      users: [] as UserResult[],
      isLoading: false as boolean,
      prevArg: "" as string,
    };
  },
  actions: {
    async fetchUsers(filter?: string): Promise<UserResult[]> {
      while (this.isLoading) {
        await sleep(50);
      }
      if (
        this.users == undefined ||
        this.users.length == 0 ||
        filter != this.prevArg
      ) {
        console.log(filter);
        this.isLoading = true;
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users?${filter}`,
        );
        this.isLoading = false;
        if (!response.ok) {
          throw new Error(await response.json());
        }
        let res: UserResult[] = {};
        await response.json().then((json: Record<string, any>[]) => {
          json.forEach((user) => {
            Object.assign(user, { img: img, text: text });
          });
          res = json as UserResult[];
        });
        this.users = res;
        this.prevArg = filter ?? "";
      }
      return this.users;
    },
  },
});
