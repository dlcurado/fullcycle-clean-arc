import Customer from "../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import Address from "../../../domain/customer/value-object/address";
import { OutputCreateCustomerDto } from "../create/create.customer.dto";
import { InputUpdateCustomerDto } from "./update.customer.dto";

export default class UpdateCustomerUseCase {
  private CustomerRepository: CustomerRepositoryInterface;
  constructor(CustomerRepository: CustomerRepositoryInterface){
    this.CustomerRepository = CustomerRepository;
  }

  async execute(input: InputUpdateCustomerDto): Promise<OutputCreateCustomerDto>{
    const customer = await this.CustomerRepository.find(input.id)
    customer.changeName(input.name);
    customer.changeAddress(new Address(
      input.address.street,
      input.address.number,
      input.address.zip,
      input.address.city
    ));

    await this.CustomerRepository.update(customer);

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        number: customer.address.number,
        zip: customer.address.zip,
        city: customer.address.city
      }
    }
  }
}