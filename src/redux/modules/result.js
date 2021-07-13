import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { api } from "../../shared/api";

//action type
const GET_MENU = "GET_MENU";
const GET_MENU_DETAIL = "GET_MENU_DETAIL";
const ADD_MENU = "ADD_MENU";
const EDIT_MENU = "EDIT_MENU";
const DELETE_MENU = "DELETE_MENU";
const GET_RANK = "GET_RANK";
const UPDATE_RANK = "UPDATE_RANK";

// action create function
// main page
const getMenu = createAction(GET_MENU, (menuList) => ({
  menuList,
}));

// main page
const getMenuDetail = createAction(GET_MENU_DETAIL, () => ({}));

// upload page
const addMenu = createAction(ADD_MENU, (newMenu) => ({
  newMenu,
}));

// main page
const getRank = createAction(GET_RANK, (menu_like) => ({ menu_like }));

// main page
const updateRank = createAction(UPDATE_RANK, () => ({}));

// 내 게시글 page
const editMenu = createAction(EDIT_MENU, () => ({}));
const deleteMenu = createAction(DELETE_MENU, () => ({}));

// initialState

const initialState = {
  list: [],
  rank_list: [],
};

// thunk
const getMenuDB =
  (category) =>
  async (dispatch, getState, { history }) => {
    const option = {
      params: {
        ...category, // 카테고리 한글 인코딩/디코딩 혹은 다른 규칙 필요
      },
    };
    const { data: menuList } = await api.get("/menu", option);
    dispatch(getMenu(menuList));
  };

const getMenuDetailDB =
  (id) =>
  async (dispatch, getState, { history }) => {
    const menu_detail = await api.get(`/menu/${id}`);
    console.log(menu_detail);
    dispatch(getMenuDetail());
  };

const addMenuDB =
  (dataObj) =>
  async (dispatch, getState, { history }) => {
    const { userId } = getState().user.user;
    const newObj = { id: userId, ...dataObj };

    const formData = new FormData();
    for (let entry of Object.entries(newObj)) {
      formData.append(entry[0], entry[1]);
    }

    try {
      // 서버가 있을 때는 주석 풀기
      // const {
      //   data: {
      //     result: { id: menuId, img, description },
      //   },
      // } = await api.post("/menu", formData, {
      //   headers: { "Content-Type": "multipart/form-data" },
      // });
      // const stateObj = { ...newObj, img, menuId, description };

      // 가짜 데이터🙋🏻‍♀️
      const stateObj = {
        menuId: 5,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk8TgzcEGvR9rAOG8unUUaLnKWwyzRgIl5ew&usqp=CAU",
        description: "하하하",
        name: "비빔밥",
        userId,
      };

      dispatch(addMenu(stateObj));
    } catch (err) {
      console.log("메뉴 등록 실패", err);
    }
  };

const deleteMenuDB = () => {
  return function (dispatch, getState, { history }) {};
};

// const getRankDB = (name, img) => {
//   return function (dispatch, getState, { history }) {
//     api.get(`/menu?name=`).then((res) => {
//       console.log(res.data);
//       const menu_like = res.data.result;
//       dispatch(getRank(menu_like));
//     });
//   };
// };

const updateRankDB = () => {
  return function (dispatch, getState, { history }) {};
};

//reducer
export default handleActions(
  {
    [GET_MENU]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.menuList;
      }),
    [GET_MENU_DETAIL]: (state, action) => produce(state, (draft) => {}),
    [ADD_MENU]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(action.payload.newMenu);
      }),

    [EDIT_MENU]: (state, action) => produce(state, (draft) => {}),
    [DELETE_MENU]: (state, action) => produce(state, (draft) => {}),
    [GET_RANK]: (state, action) =>
      produce(state, (draft) => {
        draft.rank_list.push(action.payload.menu_like);
      }),
    [UPDATE_RANK]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

const actionCreators = {
  getMenu,
  getMenuDetail,
  addMenu,
  editMenu,
  deleteMenu,
  updateRank,
  getRank,
  addMenuDB,
  // editMenuDB,
  deleteMenuDB,
  getMenuDB,
  getMenuDetailDB,
  updateRankDB,
  //   getRankDB,
};

export { actionCreators };
