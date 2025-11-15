/**
 * A response class
 *  msg = the message of the response
 *  data = data object
 *  status = the response status
 */
class ResponseObj {
  status: number;
  data: object | any[] | null;
  meta: object | null;
  msg: string;

  constructor(
    status: number,
    data: object | any[] | null,
    meta: object | null,
    msg: string
  ) {
    this.status = status;
    this.data = data;
    this.meta = meta;
    this.msg = msg;
  }
}

export default ResponseObj;
