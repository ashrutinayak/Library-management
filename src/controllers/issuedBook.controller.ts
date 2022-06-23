import { RequestHandler, Request, Response } from "express";
import models from "../config/model.config";
import jwt, { JwtPayload } from "jsonwebtoken";
import messageConstant from "../constants/message.constant";
import httpStatusConstant from "../constants/httpStatusCode.constant";

type filter_features = {
  issuedDate: Date | null;
  customer_id: number | null;
  book_id: number | null;
  author_id: number | null;
  category_id: number | null;
  librarian_id: number | null;
};

type Return_Result = {
  book_id: number | null;
  issuedDate: Date | null;
  customer_id: number | null;
  librarian_id: number | null;
  author_id: number | null;
  category_id: number | null;
};
const issueBook: RequestHandler = async (req, res) => {
  try {
    const findBk = await models.Book.findOne({
      where: { code: req.body.book_code },
    });
    if (!findBk) {
      return res.failResponse(
        httpStatusConstant.NOT_FOUND,
        messageConstant.noBookFound
      );
    }
    const BkId = findBk.id;
    const findCus = await models.User.findOne({
      where: { Code: req.body.customer_code },
    });
    if (!findCus) {
      return res.failResponse(
        httpStatusConstant.NOT_FOUND,
        messageConstant.noUserFound
      );
    }
    const CusId = findCus.id;
    const alreadyIssued = await models.issuedBook.findOne({
      where: { bookID: BkId, customerUserID: CusId, status: 1 },
    });
    if (alreadyIssued) {
      const updentry = await models.issuedBook.update(
        {
          status: 2,
        },
        { where: { id: alreadyIssued.id } }
      );
      const renewentry = await models.issuedBook.create({
        renewIssuedBookID: alreadyIssued.id,
        bookID: BkId,
        customerUserID: CusId,
        librarianUserID: req.body.UserID,
        startDateTime: Date.now(),
        endDateTime: req.body.endDateTime,
        status: 1,
      });
      if (renewentry) {
        return res.successResponse(
          httpStatusConstant.OK,
          messageConstant.bookRenewed
        );
      }
    } else {
      const findAllBks = await models.issuedBook.findAll({
        where: { customerUserID: CusId, status: 1 },
      });

      if (findAllBks.length >= 5) {
        return res.failResponse(
          httpStatusConstant.BAD_REQUEST,
          messageConstant.LimitExceeded
        );
      } else {
        if (findBk.inStock > 0) {
          const occupied_book = await models.issuedBook.findAll({
            where: { bookID: BkId, status: 1 },
          });
          const avail_bks = findBk.inStock - occupied_book.length;
          if (avail_bks > 0) {
            const newentry = await models.issuedBook.create({
              bookID: BkId,
              customerUserID: CusId,
              librarianUserID: req.body.UserID,
              startDateTime: Date.now(),
              endDateTime: req.body.endDateTime,
              status: 1,
            });
            if (newentry) {
              return res.successResponse(
                httpStatusConstant.OK,
                messageConstant.newBookCreated
              );
            }
          } else {
            return res.failResponse(
              httpStatusConstant.NOT_FOUND,
              messageConstant.currentlynotavailable
            );
          }
        } else {
          return res.failResponse(
            httpStatusConstant.NOT_FOUND,
            messageConstant.outofstock
          );
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.failResponse(httpStatusConstant.INTERNAL_SERVER_ERROR, null, {
      error: error,
    });
  }
};

const submitBook: RequestHandler = async (req, res) => {
  try {
    const findBk = await models.Book.findOne({
      where: { code: req.body.book_code },
    });
    if (!findBk) {
      return res.failResponse(
        httpStatusConstant.NOT_FOUND,
        messageConstant.noBookFound
      );
    }
    const BkId = findBk.id;
    const findCus = await models.User.findOne({
      where: { Code: req.body.customer_code },
    });
    if (!findCus) {
      return res.failResponse(
        httpStatusConstant.NOT_FOUND,
        messageConstant.noUserFound
      );
    }
    const CusId = findCus.id;
    const alreadyIssued = await models.issuedBook.findOne({
      where: { bookID: BkId, customerUserID: CusId, status: 1 },
    });
    if (alreadyIssued) {
      const Submitted = await models.issuedBook.update(
        {
          status: 3,
          submitDateTime: Date.now(),
        },
        { where: { id: alreadyIssued.id } }
      );
      if (Submitted) {
        return res.successResponse(
          httpStatusConstant.OK,
          messageConstant.bookSubmitted
        );
      }
    } else {
      return res.failResponse(
        httpStatusConstant.BAD_REQUEST,
        messageConstant.Notissued
      );
    }
  } catch (error) {
    console.log(error);
    res.failResponse(httpStatusConstant.INTERNAL_SERVER_ERROR, null, {
      error: error,
    });
  }
};

const lostBook: RequestHandler = async (req, res) => {
  try {
    const findBk = await models.Book.findOne({
      where: { code: req.body.book_code },
    });
    if (!findBk) {
      return res.failResponse(
        httpStatusConstant.NOT_FOUND,
        messageConstant.noBookFound
      );
    }
    const BkId = findBk.id;
    const findCus = await models.User.findOne({
      where: { Code: req.body.customer_code },
    });
    if (!findCus) {
      return res.failResponse(
        httpStatusConstant.NOT_FOUND,
        messageConstant.noUserFound
      );
    }
    const CusId = findCus.id;
    const alreadyIssued = await models.issuedBook.findOne({
      where: { bookID: BkId, customerUserID: CusId, status: 1 },
    });
    if (alreadyIssued) {
      const Lost = await models.issuedBook.update(
        {
          status: 4,
        },
        { where: { id: alreadyIssued.id } }
      );
      if (Lost) {
        const updStatus = await models.Book.update(
          {
            inStock: findBk.inStock - 1,
            updatedUserID: req.body.UserID,
          },
          { where: { id: BkId } }
        );

        if (updStatus) {
          return res.successResponse(
            httpStatusConstant.OK,
            messageConstant.bookLost
          );
        }
      }
    } else {
      return res.failResponse(
        httpStatusConstant.BAD_REQUEST,
        messageConstant.Notissued
      );
    }
  } catch (error) {
    console.log(error);
    res.failResponse(httpStatusConstant.INTERNAL_SERVER_ERROR, null, {
      error: error,
    });
  }
};

const bookFilterFeatures: RequestHandler = async (req, res) => {
  const filters: filter_features = req.body;
  let Print_Data: Return_Result[] = [];
  try {
    const user1 = await models.User.findOne({ where: { id: req.body.UserID } });
    const bks = await models.issuedBook.findAll();
    if (bks && bks.length > 0) {
      for (let x in bks) {
        const cur_book = await models.Book.findOne({
          where: { id: bks[x].bookID },
        });
        Print_Data.push({
          book_id: bks[x].bookID,
          issuedDate: bks[x].startDateTime,
          customer_id: bks[x].customerUserID,
          librarian_id: bks[x].librarianUserID,
          author_id: cur_book.bookAuthorID,
          category_id: cur_book.bookCategoryID,
        });
      }
    }
    let filtered_info;
    if (filters.book_id) {
      filtered_info = Print_Data.filter((i) => {
        return i.book_id == filters.book_id;
      });
    }
    if (filters.issuedDate) {
      if (filtered_info) {
        filtered_info = filtered_info.filter((i) => {
          return i.issuedDate == filters.issuedDate;
        });
      } else {
        filtered_info = Print_Data.filter((i) => {
          return i.issuedDate == filters.issuedDate;
        });
      }
    }
    if (filters.customer_id) {
      if (filtered_info) {
        filtered_info = filtered_info.filter((i) => {
          return i.customer_id == filters.customer_id;
        });
      } else {
        filtered_info = Print_Data.filter((i) => {
          return i.customer_id == filters.customer_id;
        });
      }
    }
    if (filters.author_id) {
      if (filtered_info) {
        filtered_info = filtered_info.filter((i) => {
          return i.author_id == filters.author_id;
        });
      } else {
        filtered_info = Print_Data.filter((i) => {
          return i.author_id == filters.author_id;
        });
      }
    }
    if (filters.category_id) {
      if (filtered_info) {
        filtered_info = filtered_info.filter((i) => {
          return i.category_id == filters.category_id;
        });
      } else {
        filtered_info = Print_Data.filter((i) => {
          return i.category_id == filters.category_id;
        });
      }
    }
    if (user1.RoleID == 3) {
      if (filters.librarian_id) {
        if (filtered_info) {
          filtered_info = filtered_info.filter((i) => {
            return i.librarian_id == filters.librarian_id;
          });
        } else {
          filtered_info = Print_Data.filter((i) => {
            return i.librarian_id == filters.librarian_id;
          });
        }
      }
    }

    return res.status(200).json({ filtered_info });
  } catch (error) {
    console.log(error);
    res.failResponse(httpStatusConstant.INTERNAL_SERVER_ERROR, null, {
      error: error,
    });
  }
};
export default {
  issueBook,
  submitBook,
  lostBook,
  bookFilterFeatures,
};
