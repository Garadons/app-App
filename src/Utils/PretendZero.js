function PretendZero(value) {
    if (value < 10) {
      value = "0" + value;
    }
    return value;
  }

  export default PretendZero