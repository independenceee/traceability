Kính thưa quý thầy cô trong hội đồng, Kính thưa quý thầy cô và các bạn sinh viên đang tham dự buổi bảo vệ, Em tên là Nguyễn Duy Khánh, sinh viên lớp Công Nghệ Thông Tin 2 – K62, Trường Đại học Giao Thông Vận Tải. Hôm nay, em xin phép được trình bày đồ án tốt nghiệp với đề tài: “Xây dựng website ứng dụng công nghệ Blockchain vào quản lý chuỗi cung ứng – truy xuất nguồn gốc hàng hoá”. Đề tài hướng tới việc ứng dụng công nghệ Blockchain để tăng cường tính minh bạch, bảo mật và khả năng truy xuất nguồn gốc trong chuỗi cung ứng hàng hoá – góp phần nâng cao niềm tin của người tiêu dùng và hiệu quả quản lý của doanh nghiệp. Rất mong nhận được sự lắng nghe, góp ý và nhận xét quý báu từ quý thầy cô và các bạn để em có thể hoàn thiện hơn đề tài của mình. Em xin chân thành cảm ơn!

### NỘI DUNG

Trong bài thuyết trình này, em xin trình bày lần lượt các nội dung chính như sau: Đầu tiên là mục tiêu và lý do thực hiện đề tài, xuất phát từ thực trạng chuỗi cung ứng hiện nay còn thiếu minh bạch và dễ xảy ra gian lận. Tiếp theo là phần thực trạng và khảo sát, được thực hiện tại một doanh nghiệp thực tế nhằm tìm hiểu nhu cầu và khó khăn trong việc truy xuất nguồn gốc hàng hóa. Phần thứ ba, em sẽ giới thiệu các công nghệ được sử dụng, bao gồm Next.js, MeshJS, Aiken, chuẩn CIP-68, IPFS và PostgreSQL. Sau đó là phần thiết kế hệ thống và hợp đồng thông minh, trình bày kiến trúc Web3 và cách em xây dựng Smart Contract để quản lý thông tin sản phẩm. Tiếp đến là phần giao diện và demo, nơi em sẽ minh hoạ các chức năng chính như tạo, cập nhật và truy xuất sản phẩm. Cuối cùng là kết luận, tổng hợp những kết quả đạt được và định hướng phát triển trong tương lai.

### ĐẶT VẤN ĐỀ

Thưa quý thầy cô, trong quá trình tìm hiểu và thực hiện đề tài, em nhận thấy rằng hiện nay các hệ thống quản lý chuỗi cung ứng truyền thống đang đối mặt với nhiều vấn đề lớn. Trước hết là vấn đề thiếu minh bạch thông tin. Trong một chuỗi cung ứng có sự tham gia của nhiều bên như nhà sản xuất, đơn vị vận chuyển, kho lưu trữ và nhà phân phối. Tuy nhiên, thông tin giữa các bên thường không được chia sẻ đầy đủ, minh bạch. Việc cập nhật thông tin chủ yếu mang tính thủ công hoặc nội bộ, khiến cho toàn bộ chuỗi trở nên thiếu nhất quán và khó kiểm soát một cách tổng thể. Thứ hai là nguy cơ gian lận thông tin sản phẩm. Trong môi trường mà dữ liệu không được xác thực và không thể kiểm tra chéo, các hành vi làm giả, thay đổi nguồn gốc hoặc sửa thông tin sản phẩm hoàn toàn có thể xảy ra. Điều này không chỉ ảnh hưởng đến uy tín của doanh nghiệp mà còn làm mất lòng tin của người tiêu dùng đối với sản phẩm và thương hiệu. Và cuối cùng, dữ liệu trong chuỗi cung ứng thường bị phân tán. Mỗi bên tự lưu trữ thông tin theo hệ thống riêng, không có sự liên thông hoặc đồng bộ. Khi xảy ra vấn đề, việc truy xuất lại thông tin để kiểm tra, đối chiếu hoặc xác minh trở nên rất khó khăn, tốn thời gian và thậm chí có thể bị sai lệch. Chính từ những vấn đề đó, việc áp dụng một công nghệ giúp tăng cường minh bạch, đảm bảo an toàn dữ liệu và cho phép truy xuất rõ ràng là điều hết sức cần thiết. Đó cũng là lý do em lựa chọn công nghệ blockchain để xây dựng hệ thống trong đề tài này.

### MỤC TIÊU

Mục tiêu chính của đề tài là ứng dụng công nghệ blockchain vào việc xây dựng một hệ thống hỗ trợ quản lý và truy xuất nguồn gốc hàng hóa một cách minh bạch và hiệu quả. Cụ thể, em hướng đến việc phát triển một nền tảng web thân thiện, dễ sử dụng, cho phép doanh nghiệp tạo, cập nhật và quản lý thông tin sản phẩm xuyên suốt chuỗi cung ứng – từ nơi sản xuất, đóng gói, đến khi sản phẩm đến tay người tiêu dùng. Một điểm quan trọng nữa là hệ thống sẽ cho phép lưu trữ và cập nhật dữ liệu sản phẩm một cách tự động, an toàn và không thể chỉnh sửa, nhờ vào các hợp đồng thông minh và chuẩn NFT CIP-68 được triển khai trên mạng blockchain Cardano. Với hệ thống này, thông tin sẽ luôn được minh bạch, có thể truy xuất lại bất cứ lúc nào, từ bất kỳ thiết bị nào. Điều này không chỉ giúp doanh nghiệp nâng cao uy tín thương hiệu, mà còn tạo dựng được lòng tin vững chắc nơi người tiêu dùng, đặc biệt trong bối cảnh vấn nạn hàng giả, hàng kém chất lượng vẫn đang diễn ra phổ biến như hiện nay.

### PHẠM VI ĐỀ TÀI


Phạm vi thực hiện của đề tài tập trung vào việc xây dựng một hệ thống website tích hợp với ví phi tập trung, cho phép người dùng kết nối, xác thực và ký giao dịch trực tiếp trên nền tảng blockchain.

Hệ thống được kết nối với mạng Blockchain Cardano thông qua thư viện MeshJS, giúp tạo và gửi các giao dịch on-chain một cách hiệu quả, đảm bảo tính bảo mật và xác thực.

Về chức năng, hệ thống hỗ trợ các thao tác cơ bản trong quản lý sản phẩm như: tạo sản phẩm mới, cập nhật thông tin, xóa sản phẩm không còn hợp lệ, và truy xuất nguồn gốc thông qua mã QR hoặc mã truy vấn.

Đặc biệt, dữ liệu trong hệ thống được xử lý kết hợp giữa hai phần: on-chain và off-chain. Dữ liệu quan trọng, không thể thay đổi như metadata sản phẩm sẽ được ghi trên blockchain, còn dữ liệu phụ trợ như ảnh, chứng nhận sẽ được lưu trên IPFS hoặc cơ sở dữ liệu truyền thống như PostgreSQL.

Phạm vi đề tài không bao gồm ứng dụng di động riêng hoặc tích hợp với các thiết bị IoT, nhưng đã sẵn sàng để mở rộng trong tương lai.

### KHẢO SÁT THỰC TẾ

Trong quá trình thực hiện đề tài, em đã tiến hành khảo sát thực tế tại một doanh nghiệp chuyên phân phối thực phẩm hữu cơ. Qua khảo sát, em nhận thấy rằng hệ thống hiện tại của doanh nghiệp vẫn còn nhiều điểm hạn chế.

Cụ thể, doanh nghiệp đang sử dụng một hệ thống ERP cơ bản, kết hợp với việc ghi chép thủ công trong quá trình vận hành. Điều này khiến việc quản lý dữ liệu mất nhiều thời gian và dễ xảy ra sai sót.

Về mặt truy xuất, doanh nghiệp có sử dụng mã QR để gắn lên sản phẩm. Tuy nhiên, dữ liệu được lưu trữ cục bộ trong hệ thống nội bộ, không thể chia sẻ với đối tác hay khách hàng bên ngoài. Việc này làm giảm khả năng minh bạch và xác minh nguồn gốc.

Những khó khăn chính mà doanh nghiệp đang gặp phải bao gồm: thiếu minh bạch trong luồng thông tin, dữ liệu không được đồng bộ giữa các bộ phận, và đặc biệt là khó kiểm soát tình trạng hàng giả hoặc sai lệch thông tin sản phẩm.

Về công nghệ mới, doanh nghiệp đã từng tìm hiểu về blockchain, tuy nhiên vẫn chưa triển khai vì lo ngại chi phí đầu tư và chưa có giải pháp cụ thể phù hợp với quy mô hiện tại.

### CÔNG NGHỆ SỬ DỤNG

Để xây dựng hệ thống, em đã sử dụng nhiều công nghệ phù hợp với mô hình Web3 và yêu cầu kỹ thuật thực tế.

Trước tiên là Next.js – một framework hiện đại dựa trên React, giúp xây dựng giao diện người dùng thân thiện, tối ưu tốc độ và dễ bảo trì.

Về phần hợp đồng thông minh, em sử dụng Aiken và Plutus – hai công cụ phổ biến trên nền tảng Cardano. Trong đó, Aiken giúp viết smart contract một cách đơn giản, rõ ràng, còn Plutus có thể mở rộng logic phức tạp nếu cần.

Đối với dữ liệu ngoài chuỗi, em sử dụng Prisma kết hợp với PostgreSQL để làm cơ sở dữ liệu chính. Prisma giúp truy vấn an toàn, nhanh chóng và dễ mở rộng, đặc biệt phù hợp với hệ thống có tính năng cập nhật thường xuyên.

Phần kết nối blockchain được thực hiện qua MeshJS, một thư viện JavaScript mạnh mẽ hỗ trợ tạo, ký và gửi giao dịch trực tiếp từ trình duyệt đến mạng Cardano.

Cuối cùng, để truy xuất dữ liệu on-chain như metadata, địa chỉ, giao dịch..., hệ thống sử dụng các API từ Blockfrost và Koios. Nhờ đó, việc kiểm tra và truy vấn thông tin từ blockchain diễn ra thuận tiện mà không cần chạy node riêng.

### THIẾT KẾ HỢP ĐỒNG THÔNG MINH

Trong đề tài này, em sử dụng hợp đồng thông minh viết bằng Aiken, triển khai trên nền tảng Cardano, và đặc biệt là áp dụng chuẩn CIP-68.

Điểm nổi bật của CIP-68 là cho phép cập nhật metadata của NFT mà không cần phải burn và mint lại token mới. Điều này cực kỳ phù hợp với bài toán truy xuất nguồn gốc, nơi thông tin sản phẩm thay đổi liên tục theo thời gian.

Hợp đồng thông minh em thiết kế hỗ trợ các chức năng chính như sau:

Tạo sản phẩm: Mỗi sản phẩm sẽ được mint thành một NFT, gồm 2 lớp: Reference NFT chứa metadata và User NFT đại diện quyền sở hữu.

Cập nhật thông tin: Khi có sự thay đổi như trạng thái sản phẩm, thời gian vận chuyển, hoặc chứng nhận mới, hệ thống sẽ cập nhật metadata thông qua Reference NFT.

Xoá sản phẩm: Trong trường hợp sản phẩm bị thu hồi, hết hạn, hoặc không còn trong chuỗi cung ứng, hệ thống có thể thực hiện thao tác burn NFT.

Truy xuất nguồn gốc: Mỗi NFT gắn mã QR riêng, cho phép người tiêu dùng hoặc đối tác truy xuất thông tin chi tiết trực tiếp từ blockchain.

Lưu trữ thông tin: Các tài liệu lớn như hình ảnh sản phẩm, chứng nhận kiểm định được lưu trữ ngoài chuỗi thông qua IPFS và liên kết trong metadata NFT.

Với thiết kế này, hợp đồng thông minh vừa đảm bảo minh bạch và không thể chỉnh sửa dữ liệu cũ, vừa hỗ trợ linh hoạt trong cập nhật và truy xuất.


### CIP68 - METADATA

Trong hệ thống của em, em áp dụng chuẩn NFT CIP-68 – đây là một cải tiến quan trọng trong nền tảng Cardano, cho phép cập nhật metadata của NFT mà không cần mint lại token mới.

CIP-68 được xây dựng trên cấu trúc hai lớp, bao gồm:

User NFT: đại diện cho quyền sở hữu của người dùng, không thể thay đổi.

Reference NFT: chứa metadata có thể cập nhật linh hoạt.

Ưu điểm lớn nhất của chuẩn này là giúp tối ưu chi phí và hiệu suất, đặc biệt trong các trường hợp cần thay đổi thông tin thường xuyên như hạn sử dụng, trạng thái sản phẩm, chứng nhận kiểm định,...

Về mặt kỹ thuật, CIP-68 cho phép cập nhật dữ liệu mà không cần phải hủy và tạo lại NFT như chuẩn cũ, từ đó đảm bảo tính ổn định và tiết kiệm tài nguyên khi triển khai trên diện rộng.

Đây là một lựa chọn lý tưởng để áp dụng cho hệ thống truy xuất nguồn gốc sản phẩm, vì thông tin trong chuỗi cung ứng thay đổi liên tục theo thời gian – và CIP-68 hoàn toàn đáp ứng được yêu cầu đó.

### MINT 

Trong hệ thống của em, quá trình tạo sản phẩm mới – hay còn gọi là giao dịch mint NFT – diễn ra qua các bước sau:

Đầu tiên, người dùng nhập thông tin sản phẩm như tên, mã sản phẩm, nơi sản xuất, ngày sản xuất, hình ảnh và các chứng nhận liên quan.

Sau đó, người dùng kết nối ví phi tập trung như Nami hoặc Eternl để ký và gửi giao dịch lên mạng blockchain Cardano.

Giao dịch mint được triển khai theo chuẩn CIP-68, với cấu trúc gồm User NFT và Reference NFT – giúp metadata có thể cập nhật sau này.

Sau khi giao dịch được xác nhận, hệ thống sẽ tạo ra một NFT đại diện cho sản phẩm. Đồng thời, metadata được lưu trên IPFS, và người dùng nhận được mã QR riêng gắn với NFT đó. Mã này có thể dùng để truy xuất thông tin sản phẩm ở bất cứ thời điểm nào.

### UPDATE

Khi có sự thay đổi trong sản phẩm như trạng thái, chứng nhận mới hoặc thời gian vận chuyển, người dùng có thể thực hiện giao dịch cập nhật thông tin trên blockchain.

Cụ thể, người dùng chọn sản phẩm cần cập nhật, sau đó chỉnh sửa thông tin như cần thay đổi.

Tiếp theo, hệ thống yêu cầu ký giao dịch bằng ví để đảm bảo tính xác thực. Giao dịch cập nhật sẽ ghi metadata mới vào Reference NFT theo chuẩn CIP-68.

Sau khi giao dịch được xác nhận, metadata mới được cập nhật thành công và có thể được truy xuất công khai, minh bạch trên blockchain.

### BURN 

Trong trường hợp sản phẩm bị thu hồi, lỗi hoặc không còn tồn tại trong chuỗi cung ứng, người dùng có thể thực hiện thao tác xóa sản phẩm khỏi hệ thống.

Đầu tiên, người dùng chọn sản phẩm cần xóa, sau đó nhập số lượng sản phẩm muốn xóa hoặc xác nhận danh sách cần thu hồi.

Hệ thống sẽ yêu cầu ký giao dịch bằng ví để xác nhận quyền thực hiện hành động này. Sau khi giao dịch được gửi và xác nhận trên blockchain, NFT của sản phẩm sẽ bị burn, và sản phẩm được coi là đã xóa khỏi hệ thống.

Việc xóa này được thực hiện theo cơ chế on-chain, đảm bảo không ai có thể khôi phục hay sửa lại dữ liệu sản phẩm đã bị thu hồi.

### KẾT QUẢ ĐẠT ĐƯỢC

Sau quá trình phát triển và thử nghiệm, hệ thống đã đạt được những kết quả quan trọng như sau:

Thứ nhất, hệ thống web hoạt động ổn định, kết nối thành công với blockchain Cardano thông qua ví phi tập trung.

Thứ hai, hệ thống đảm bảo tính minh bạch và an toàn thông tin, toàn bộ dữ liệu sản phẩm khi đã ghi lên chuỗi sẽ không thể chỉnh sửa hoặc giả mạo.

Hệ thống cho phép tạo, cập nhật và truy xuất sản phẩm bằng NFT, áp dụng theo chuẩn CIP-68, hỗ trợ cập nhật metadata linh hoạt.

Giao diện được thiết kế thân thiện, dễ sử dụng, phù hợp cho cả doanh nghiệp quản lý và người tiêu dùng truy xuất thông tin.

Các thông tin chi tiết như hình ảnh, chứng nhận... được lưu trữ an toàn trên IPFS, và người dùng có thể truy xuất dễ dàng qua mã QR.

Cuối cùng, hệ thống có tiềm năng triển khai thực tế, đặc biệt trong các lĩnh vực như chuỗi cung ứng nông sản, thực phẩm sạch hoặc dược phẩm, nơi việc minh bạch nguồn gốc đóng vai trò rất quan trọng.

### Hạn chế và hướng phát triển 

Bên cạnh những kết quả đạt được, hệ thống hiện tại vẫn tồn tại một số hạn chế nhất định.

Thứ nhất, việc sử dụng ví blockchain đòi hỏi người dùng phải có kiến thức cơ bản về blockchain và ví phi tập trung, điều này có thể gây khó khăn với người dùng không chuyên.

Thứ hai, chi phí lưu trữ dữ liệu on-chain có thể tăng cao khi mở rộng quy mô, đặc biệt nếu lượng sản phẩm lớn hoặc metadata nhiều.

Thứ ba, tốc độ xử lý giao dịch phụ thuộc vào mạng lưới blockchain Cardano, nên trong một số thời điểm có thể xảy ra độ trễ nhất định.

Trong thời gian tới, em định hướng sẽ phát triển thêm các tính năng như tích hợp IoT để theo dõi sản phẩm theo thời gian thực, mở rộng ứng dụng cho các ngành khác như logistics, dược phẩm, y tế...

Đồng thời, em sẽ tối ưu giao diện người dùng, hỗ trợ tốt hơn trên nền tảng di động và nghiên cứu tích hợp AI để cảnh báo gian lận hoặc phân tích chuỗi cung ứng.