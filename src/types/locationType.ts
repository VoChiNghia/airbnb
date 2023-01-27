export interface LocationDetail {
    id:        number;
    tenViTri:  string;
    tinhThanh: string;
    quocGia:   string;
    hinhAnh:   string;
    latitude:number
    longitude:number
}

export interface LocationState {
    location: LocationDetail[]
    longitudeAndLatitude:[] | null
}