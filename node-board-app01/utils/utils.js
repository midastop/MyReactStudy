export function dateFormat(d, sep, format) {
  let year = d.getFullYear();
  let month = d.getMonth() + 1;
  let date = d.getDate();
  let hour = d.getHours();
  let minute = d.getMinutes();
  let second = d.getSeconds();

  if(sep == "-" && format == "dt") {
    return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
  } else if(sep == "-" && format == "d") {
    return `${year}-${month}-${date}`;
  } else if(sep == "/" && format == "dt") {
    return `${year}/${month}/${date} ${hour}:${minute}:${second}`;
  } else if(sep == "/" && format == "d") {
    return `${year}/${month}/${date}`;    
  } else {
    return d.toLocaleString();
  }
}