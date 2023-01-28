export interface Room {
    id:       number;
    tenPhong: string;
    khach:    number;
    phongNgu: number;
    giuong:   number;
    phongTam: number;
    moTa:     string;
    giaTien:  number;
    mayGiat:  boolean;
    banLa:    boolean;
    tivi:     boolean;
    dieuHoa:  boolean;
    wifi:     boolean;
    bep:      boolean;
    doXe:     boolean;
    hoBoi:    boolean;
    banUi:    boolean;
    maViTri:  number;
    hinhAnh:  string;
    ngayDen?:      Date;
    ngayDi?:       Date;
    roomId?:number;
}

export interface CommentDetail {
    ngayBinhLuan:     string;
    noiDung:          string;
    saoBinhLuan:      number;
    tenNguoiBinhLuan: string;
    avatar:           string;
}

export interface BookRoom {
    id?:number
    maPhong:      number;
    ngayDen:      Date;
    ngayDi:       Date;
    soLuongKhach: number;
    maNguoiDung:  number;
}