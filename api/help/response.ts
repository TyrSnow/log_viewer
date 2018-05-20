import CODE from '../constants/code';

/**
 * 封装请求返回
 */

const LIST = (req, res) => {
  return (data) => {
    const { list = [], page } = data;
    res.json({
      success: true,
      list,
      page,
    });
  };
};

const SUCCESS = (req, res) => {
  return (data) => {
    res.json({
      success: true,
      data,
    });
  };
};

const TEXT = (req, res) => {
  return (data: string) => {
    res.send(data);
  };
};

const ERROR = (req, res) => {
  return (err) => {
    if (err instanceof Error) {
      // 未处理的系统错误
      res.status(500).send(CODE.ERROR);
    } else {
      const { status = 200, ...other } = err;
      res.status(status).send(other);
    }
  };
};

export { SUCCESS, LIST, TEXT, ERROR };
