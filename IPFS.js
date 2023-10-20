// 将文件上传至第三方IPFS

const axios = require('axios')
const FormData = require('form-data')

// 敏感密钥信息，后续代码公开时考虑加密
const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJiYmZlMTg2Yy0wZTYzLTRlOTItYWVkNy0zYTNmNjlmNTc2Y2UiLCJlbWFpbCI6IjUyNzgxMTU0NUBxcS5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNzNmNjdjMTZhN2Q5YmQ4NTM0MjUiLCJzY29wZWRLZXlTZWNyZXQiOiIzYzNmMjVmMmViMzI3YTIwNWNlN2MwOTAwZTg2ODQ5NjA2OWU0YTYyNjJhYjNiYjUyODcwM2MwNGJiMjNiMGE0IiwiaWF0IjoxNjk3NzA1NDcyfQ.cDsTIIxnNPv8iORR_kPKyJm6EF0XWL8WUkpeGOZ0vrw"

// 后续应在async ()中添加的参数：File name
const pinFileToIPFS = async (fileBuffer, fileName) => {
  // formData就是需要我们传给IPFS的数据对象
  const formData = new FormData();
  
  // 使用 Buffer 对象而不是从磁盘读取的文件流
  formData.append('file', fileBuffer, { filename: fileName });
    
  // 构建包含文件的元数据的JSON字符串（pinataMetadata变量），并将其添加到表单数据中
  // 这里暂时只给出了文件名称
  const pinataMetadata = JSON.stringify({
    name: fileName, // 使用传入的文件名
  });
  formData.append('pinataMetadata', pinataMetadata);
  
  // 指定文件的CID版本，无需对其进行改动
  const pinataOptions = JSON.stringify({
    cidVersion: 0,
  })
  formData.append('pinataOptions', pinataOptions);

  try {
    const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
      maxBodyLength: "Infinity",
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        'Authorization': `Bearer ${JWT}`
      }
    });
    
    // 如果请求成功并且res.data中有IpfsHash属性，返回这个哈希值
    if (res.data && res.data.IpfsHash) {
      return res.data.IpfsHash;
    }

    // 如果没有找到IpfsHash属性，返回null
    return null;

  } catch (error) {
    console.log(error);
    return null; // 或者可以返回错误消息，如return error.message;
  }
}
module.exports = pinFileToIPFS;
