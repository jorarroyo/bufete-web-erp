package com.bufete.backend.model.recordFiles;

import com.bufete.backend.model.shared.StatusName;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "record_file_search_view")
public class RecordFileSearchView {

    @Id
    private Long id;
    @Column(name = "file_num")
    private String fileNum;
    @Column(name = "client_name")
    private String clientName;
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private StatusName status;
    @Column(name = "opening_date")
    private Date openingDate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFileNum() {
        return fileNum;
    }

    public void setFileNum(String fileNum) {
        this.fileNum = fileNum;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public StatusName getStatus() {
        return status;
    }

    public void setStatus(StatusName status) {
        this.status = status;
    }

    public Date getOpeningDate() {
        return openingDate;
    }

    public void setOpeningDate(Date openingDate) {
        this.openingDate = openingDate;
    }
}
