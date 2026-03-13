// Value Objects representam valores do domínio que têm regra própria.
// Esse no caso é para validação do campo email
export class Email {
  private value: string;

  constructor(email: string) {
    if (!email.includes("@")) {
      throw new Error("Invalid email");
    }

    this.value = email;
  }

  getValue() {
    return this.value;
  }
}
