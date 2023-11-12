import ShoesInput from "src/components/shoes-input";
import { Pagination } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import css from "./profile.module.scss";
import ShoesInputRadioGender from "src/components/shoes_input_radio";
import { useFormik } from "formik";
import { useState } from "react";
import { getLocalStorage } from "src/utils";
import {
  ACCESS_TOKEN,
  MESSAGE,
  FIELD_PROPS_NAME,
  FIELD_PROPS_NAME_UPPER_FIRST_CHAR,
  NAVIGATE_URL,
} from "src/constants";
import {
  getProfile,
  updatePassword,
  updateProfile,
} from "src/services/user.service";
import * as Y from "yup";
import Paging from "src/components/paging";
export type TUserProfileUpdate = {
  name: string;
  email: string;
  gender: boolean;
  phone: string;
};
const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
const registerSchema = Y.object({
  name: Y.string().required(),
  email: Y.string()
    .email("Email không đúng định dạng")
    .required("Email không được bỏ trống."),
  phone: Y.string()
    .matches(phoneRegExp, "Số điện thoại không đúng định dạng")
    .required("Số điện thoại không được bỏ trống."),
  password: Y.string()
    .min(5, "Password phải lớn hơn 5 ký tự.")
    .max(20, "Password phải nhỏ hơn 20 ký tự."),
});
export default function Profile() {
  const navigate = useNavigate();
  const [listOrder, setListOrder] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const formik = useFormik({
    initialValues: {
      avatar: "",
      name: "",
      email: "",
      gender: true,
      phone: "",
      password: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      try {
        const { name, email, gender, phone, password } = values;
        const data = {
          name,
          email,
          gender,
          phone,
        };
        let updateProfileSuccessFlag = true;
        let updatePasswordSuccessFlag = true;
        const updateProfileResp = await updateProfile(data);
        if (updateProfileResp?.data.content !== MESSAGE.success) {
          updateProfileSuccessFlag = false;
        }
        if (password) {
          const updatePasswordResp = await updatePassword(password);
          if (updatePasswordResp?.data.content !== MESSAGE.success) {
            updatePasswordSuccessFlag = false;
          }
        }
        // hien thi thong bao
        if (updatePasswordSuccessFlag && updateProfileSuccessFlag) {
          alert(MESSAGE.success);
          return;
        }
        if (!updateProfileSuccessFlag) {
          alert(MESSAGE.fail_update_profile);
          return;
        }
        if (!updatePasswordSuccessFlag) {
          alert(MESSAGE.fail_update_password);
        }
      } catch (err) {
        console.log(err);
      }
    },
  });
  useEffect(() => {
    (async () => {
      const token = getLocalStorage(ACCESS_TOKEN);
      if (!token) {
        navigate(NAVIGATE_URL.login);
      }
      const data = await getProfile();
      if (data?.data.message !== MESSAGE.success) {
        return;
      }
      const { avatar, email, gender, phone, name } = data?.data.content ?? {};
      formik.setFieldValue(FIELD_PROPS_NAME.avatar, avatar);
      formik.setFieldValue(FIELD_PROPS_NAME.email, email);
      formik.setFieldValue(FIELD_PROPS_NAME.gender, gender);
      formik.setFieldValue(FIELD_PROPS_NAME.phone, phone);
      formik.setFieldValue(FIELD_PROPS_NAME.name, name);
      // ------------
      const lstOrder = data?.data.content.ordersHistory;
      lstOrder.sort(
        (item1: any, item2: any) =>
          new Date(item2.date).getTime() - new Date(item1.date).getTime(),
      );
      setListOrder(() => lstOrder);
      setTotalPage(Math.ceil(lstOrder.length / 2));
    })();
  }, []);
  const renderListCart = (currentPage: number, listOrder: []) => {
    const pageSize = 2;
    const orderSkip: number = (currentPage - 1) * pageSize;
    const listRender = listOrder.slice(orderSkip, orderSkip + pageSize);
    let totalPrice = 0;
    return listRender.map((item: any) => {
      totalPrice = 0;
      return (
        <div key={item.id} className={css["cart"]}>
          <p className={css["cart-title"]}>
            + Orders have been placed on{" "}
            {item.date.toLocaleString().replace("T", " ")}
          </p>
          <table className={css["cart-table"]}>
            <thead>
              <tr>
                <th>image</th>
                <th>name</th>
                <th>price</th>
                <th>quantity</th>
                <th>total</th>
              </tr>
            </thead>
            <tbody>
              {item.orderDetail.map((orderItem: any) => {
                totalPrice += orderItem.price * orderItem.quantity;
                return (
                  <tr key={orderItem.name}>
                    <td>
                      <img src={orderItem.image} alt="..." />
                    </td>
                    <td>{orderItem.name}</td>
                    <td>{orderItem.price}</td>
                    <td>
                      <span>{orderItem.quantity}</span>
                    </td>
                    <td>
                      {(orderItem.price * orderItem.quantity).toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div>Total: {totalPrice.toLocaleString()}</div>
        </div>
      );
    });
  };
  return (
    <>
      <div className={css["wrap"]}>
        <div className={css["title"]}>Profile</div>
        <div className={css["profile-detail"]}>
          <div className={css["profile-detail__img"]}>
            <img src={formik.values.avatar} alt="..." />
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className={css["profile-detail__input"]}
          >
            <ShoesInput
              showEye={false}
              placeholder={FIELD_PROPS_NAME_UPPER_FIRST_CHAR.Email}
              type={FIELD_PROPS_NAME.email}
              title={FIELD_PROPS_NAME.email}
              getFieldProps={formik.getFieldProps(FIELD_PROPS_NAME.email)}
              touched={formik.touched.email}
              error={formik.errors.email}
              disabled={true}
            />
            <ShoesInput
              showEye={false}
              placeholder={FIELD_PROPS_NAME_UPPER_FIRST_CHAR.Name}
              type={FIELD_PROPS_NAME.text}
              title={FIELD_PROPS_NAME_UPPER_FIRST_CHAR.Name}
              getFieldProps={formik.getFieldProps(FIELD_PROPS_NAME.name)}
              touched={formik.touched.name}
              error={formik.errors.name}
            />
            <ShoesInput
              showEye={false}
              placeholder={FIELD_PROPS_NAME_UPPER_FIRST_CHAR.Phone}
              type={FIELD_PROPS_NAME.text}
              title={FIELD_PROPS_NAME_UPPER_FIRST_CHAR.Phone}
              getFieldProps={formik.getFieldProps(FIELD_PROPS_NAME.phone)}
              touched={formik.touched.phone}
              error={formik.errors.phone}
            />
            <ShoesInput
              showEye={false}
              placeholder={FIELD_PROPS_NAME_UPPER_FIRST_CHAR.Password}
              type={FIELD_PROPS_NAME.password}
              title={FIELD_PROPS_NAME_UPPER_FIRST_CHAR.Password}
              getFieldProps={formik.getFieldProps(FIELD_PROPS_NAME.password)}
            />
            <div className={css["form_action"]}>
              <button type="submit" className={css["form_action__login"]}>
                Submit
              </button>
              <ShoesInputRadioGender
                value={formik.values.gender}
                setFieldValue={formik.setFieldValue}
              />
            </div>
          </form>
        </div>
        <div className={css["line"]} />
        <div className={css["menu"]}>
          <div className={css["menu-item"] + " " + css["active"]}>
            Order history
          </div>
          <div className={css["menu-item"]}>Favorite</div>
        </div>
        {renderListCart(currentPage, listOrder as [])}
        {totalPage > 1 && (
          <Paging
            totalItem={totalPage}
            selectedPage={currentPage}
            setSelectedPage={setCurrentPage}
          />
        )}
      </div>
    </>
  );
}
