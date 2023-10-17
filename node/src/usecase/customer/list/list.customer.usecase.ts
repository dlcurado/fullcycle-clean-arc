import Customer from "../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { InputListCustomerDto, OutputListCustomerDto } from "./list.customer.dto";

export default class ListCustomerUserCase {
  private CustomerRepository: CustomerRepositoryInterface;
  constructor(CustomerRepository: CustomerRepositoryInterface){
    this.CustomerRepository = CustomerRepository;
  }

  async execute(input: InputListCustomerDto): Promise<OutputListCustomerDto>{
    const customers = await this.CustomerRepository.findAll();

    return OutputMapper.toOutputList(customers);
  }
}

class OutputMapper {
  static toOutputList(customers: Customer[]): OutputListCustomerDto {
    return {
      customers: customers.map((customer) => ({
        id: customer.id,
        name: customer.name,
        address: {
          street: customer.address.street,
          number: customer.address.number,
          zip: customer.address.zip,
          city: customer.address.city          
        }
      }))
    }
  }
}