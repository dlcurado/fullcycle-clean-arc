import Notification from "./notification";

describe("Unit test for customer notifications",() => {
  it("Should create erros",() => {
    const notification = new Notification();
    const error = {
      message: "error message",
      context: "customer"
    };

    
    notification.addError(error);
    expect(notification.messages("customer")).toBe("customer: error message")

    const error2 = {
      message: "error message 2",
      context: "customer"
    };
    notification.addError(error2);

    expect(notification.messages("customer")).toBe("customer: error message,customer: error message 2")
  });

  it("Should create erros and filter",() => {
    const notification = new Notification();
    const error = {
      message: "error message",
      context: "customer"
    };

    
    notification.addError(error);
    expect(notification.messages("customer")).toBe("customer: error message")

    const error2 = {
      message: "error message 2",
      context: "customer"
    };
    notification.addError(error2);

    expect(notification.messages("customer")).toBe("customer: error message,customer: error message 2")

    const error3 = {
      message: "error message 3",
      context: "order"
    };
    notification.addError(error3);

    expect(notification.messages("customer")).toBe("customer: error message,customer: error message 2")
    expect(notification.messages("order")).toBe("order: error message 3")
    expect(notification.messages()).toBe("customer: error message,customer: error message 2,order: error message 3")
  });

  it("Should check if notification has at least one error",() => {
    const notification = new Notification();
    const error = {
      message: "error message",
      context: "customer"
    };

    notification.addError(error);
    expect(notification.hasError()).toBe(true);
  });

  it("Should get all errors props",() => {
    const notification = new Notification();
    const error = {
      message: "error message",
      context: "customer"
    };

    notification.addError(error);
    expect(notification.getErrors()).toEqual([error]);
    expect(notification.getErrors().length).toBeGreaterThan(0);
  });
});