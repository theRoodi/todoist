import { appActions } from "app/app-reducer";
import { Dispatch } from "redux";
import { BaseResponseType } from "common/types";

/**
 * Обработка ошибок, полученных от сервера.
 *
 * @param  data - объект с данными и сообщениями об ошибке от сервера.
 * @param  dispatch - функция для отправки действий Redux.
 * @param  showError - флаг для определения, нужно ли показывать ошибку (по умолчанию true).
 * @returns - не возвращает какое-либо значение.
 */

export const handleServerAppError = <T>(data: BaseResponseType<T>, dispatch: Dispatch, showError: boolean = true) => {
  if (showError) {
    if (data.messages.length) {
      dispatch(appActions.setAppError({ error: data.messages[0] }));
    } else {
      dispatch(appActions.setAppError({ error: "Some error occurred" }));
    }
  }
  dispatch(appActions.setAppStatus({ status: "failed" }));
};
