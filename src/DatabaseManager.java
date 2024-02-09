import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseManager {

    public static Connection getConnection() throws SQLException {
        String url = "jdbc:mysql://127.0.0.1:3306/sprava_univerzitniho_systemu";
        String username = "root";
        String password = "heslo";
        return DriverManager.getConnection(url, username, password);
    }
}
