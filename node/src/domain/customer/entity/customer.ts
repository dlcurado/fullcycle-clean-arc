import { json } from "sequelize";
import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerAddressChangedEvent from "../event/customer-address-changed.event";
import EnviaConsoleLogHandler from "../event/handler/envia-console-log.handler";
import Address from "../value-object/address";

export default class Customer {
  private _id: string;
  private _name: string = "";
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  private eventDispatcher = new EventDispatcher();
  private eventHandler = new EnviaConsoleLogHandler();

  get EventHandler(): EnviaConsoleLogHandler {
    return this.eventHandler;
  }

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();

    this.eventDispatcher.register("CustomerAddressChangedEvent", this.eventHandler);
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
    if (this._name.length === 0) {
      throw new Error("Name is required");
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  get address(): Address {
    return this._address;
  }
  
  changeAddress(address: Address) {
    this._address = address;
    this.validate();
    
    const customerAddressChangedEvent = new CustomerAddressChangedEvent({
      id: this.id,
      nome: this.name,
      endereco: `${address.street}, ${address.number} - ${address.zip} - ${address.city}`
    });

    this.eventDispatcher.notify(customerAddressChangedEvent);
  }

  isActive(): boolean {
    return this._active;
  }

  activate() {
    if (this._address === undefined) {
      throw new Error("Address is mandatory to activate a customer");
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  set address(address: Address) {
    this._address = address;
  }
}
